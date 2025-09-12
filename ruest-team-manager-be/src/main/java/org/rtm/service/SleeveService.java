package org.rtm.service;

import org.rtm.model.dto.request.DeleteSleeveRequest;
import org.rtm.model.dto.request.SaveSleeveRequest;
import org.rtm.model.dto.response.SleeveArchiveResponse;
import org.rtm.model.dto.response.SleeveResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;



import java.util.List;
import java.util.Map;

public interface SleeveService {
    SleeveResponse saveSleeve(SaveSleeveRequest request);

    List<SleeveResponse> gerSleeveByPrintingSetNumber(Integer printingSetNumber);

    SleeveResponse updateSleeve(Long id, Map<String, Object> updateSleeveRequest);

    void deleteSleeve(Long id, DeleteSleeveRequest deleteSleeveRequest);

    Page<SleeveResponse> getAllSleevesInWarehouse(Pageable pageable, Long warehouseId);

    SleeveResponse getSleeveBySleeveNumber(Integer sleeveNumber);

    Page<SleeveArchiveResponse> getAllArchivedSleeves(Pageable pageable);
}
