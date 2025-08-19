package org.rtm.service.impl;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.rtm.exception.DuplicateSleeveNumberException;
import org.rtm.exception.NotFoundException;
import org.rtm.mapper.SleeveMapper;
import org.rtm.model.dto.request.DeleteSleeveRequest;
import org.rtm.model.dto.request.SaveSleeveRequest;
import org.rtm.model.dto.response.SleeveArchiveResponse;
import org.rtm.model.dto.response.SleeveResponse;
import org.rtm.model.entity.Sleeve;
import org.rtm.model.entity.SleeveArchive;
import org.rtm.model.entity.Warehouse;
import org.rtm.model.enums.WarehouseName;
import org.rtm.repository.ArchiveSleeveRepository;
import org.rtm.repository.SleeveRepository;
import org.rtm.repository.WarehouseRepository;
import org.rtm.service.SleeveService;
import org.rtm.utils.CurrentUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;



@Service
@AllArgsConstructor
public class SleeveServiceImpl implements SleeveService {

    private final SleeveRepository sleeveRepository;
    private final WarehouseRepository warehouseRepository;
    private final ArchiveSleeveRepository archiveSleeveRepository;
    private final SleeveMapper sleeveMapper;
    private final ObjectMapper objectMapper;
    private final CurrentUser currentUser;

    @Override
    @Transactional
    public SleeveResponse saveSleeve(SaveSleeveRequest request) {

        if (sleeveNumberExists(request.sleeveNumber())) {
            throw new DuplicateSleeveNumberException(request.sleeveNumber());
        }

        Warehouse warehouse = warehouseRepository.
                getWarehouseByName(WarehouseName.valueOf(request.warehouse()));


        Sleeve sleeve = sleeveMapper.toEntity(request);
        sleeve.setWarehouse(warehouse);

        return sleeveMapper.toResponse(sleeveRepository.save(sleeve));
    }

    @Override
    public List<SleeveResponse> getSleevesBySleeveSequenceNumber(Integer sleeveSequenceNumber) {

        List<Sleeve> sleeves = sleeveRepository.findAllBySequenceNumber(sleeveSequenceNumber);

        return sleeves.stream()
                .map(sleeveMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public SleeveResponse updateSleeve(Long id, Map<String, Object> updates) {
        Integer sleeveNumber = (Integer) updates.get("sleeveNumber");
        if (sleeveNumber != null && sleeveNumberExists(sleeveNumber)) {
            throw new DuplicateSleeveNumberException(sleeveNumber);
        }

        Sleeve sleeve = sleeveRepository.findById(id).orElseThrow( () -> new NotFoundException(Math.toIntExact(id)));

        if (updates.containsKey("warehouse")) {
            String warehouseName = updates.remove("warehouse").toString();

            Warehouse warehouse = warehouseRepository.
                    getWarehouseByName(WarehouseName.valueOf(warehouseName));

            sleeve.setWarehouse(warehouse);
        }

        try {
            objectMapper.updateValue(sleeve, updates);
        } catch (JsonMappingException e) {
            throw new IllegalArgumentException("No valid fields updates: " + e.getOriginalMessage(), e);
        }

        sleeveRepository.save(sleeve);
        return sleeveMapper.toResponse(sleeve);
    }

    @Override
    @Transactional
    public void deleteSleeve(Long id, DeleteSleeveRequest deleteSleeveRequest) {
        Sleeve sleeveToDelete = sleeveRepository.findById(id).orElseThrow(() -> new NotFoundException(Math.toIntExact(id)));

        SleeveArchive sleeveArchive = sleeveMapper.toArchiveEntity(sleeveToDelete);

        String deleteReason = deleteSleeveRequest.reason();

        String deletedBy = currentUser.getFullName();

        sleeveArchive.setOriginalId(sleeveToDelete.getId());
        sleeveArchive.setDeleteReason(deleteReason);
        sleeveArchive.setDeletedByName(deletedBy);
        sleeveArchive.setDeletedAt(LocalDate.now());

        archiveSleeveRepository.save(sleeveArchive);
        sleeveRepository.deleteById(id);
    }

    @Override
    public Page<SleeveResponse> getAllSleevesInWarehouse(Pageable pageable, Long warehouseId) {
        return sleeveRepository.findAllByWarehouseId(warehouseId, pageable)
                .map(sleeveMapper::toResponse);
    }

    @Override
    public SleeveResponse getSleeveBySleeveByNumber(Integer sleeveNumber) {
        Sleeve sleeve = sleeveRepository
                .findBySleeveNumber(sleeveNumber)
                .orElseThrow(() ->
                        new NotFoundException(sleeveNumber)
                );
        return sleeveMapper.toResponse(sleeve);
    }

    @Override
    public Page<SleeveArchiveResponse> getAllArchivedSleeves(Pageable pageable) {
        return archiveSleeveRepository.findAll(pageable)
                .map(sleeveMapper::toArchiveResponse);
    }

    private boolean sleeveNumberExists(Integer sleeveNumber) {
        return sleeveRepository.existsBySleeveNumber(sleeveNumber);
    }

}
