package org.rtm.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.rtm.model.dto.request.SaveSleeveRequest;
import org.rtm.model.dto.response.SleeveArchiveResponse;
import org.rtm.model.dto.response.SleeveResponse;
import org.rtm.model.entity.Sleeve;
import org.rtm.model.entity.SleeveArchive;

@Mapper(componentModel = "spring")
public interface SleeveMapper {

    @Mapping(target = "warehouse", ignore = true)
    Sleeve toEntity(SaveSleeveRequest request);

    SleeveResponse toResponse(Sleeve sleeve);

    SleeveArchiveResponse toArchiveResponse(SleeveArchive sleeveArchive);

    @Mapping(target = "id", ignore = true)
    SleeveArchive toArchiveEntity(Sleeve sleeve);
}
