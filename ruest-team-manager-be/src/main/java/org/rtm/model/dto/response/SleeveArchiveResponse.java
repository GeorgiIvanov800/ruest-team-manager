package org.rtm.model.dto.response;

import org.rtm.model.enums.SleeveType;

import java.time.LocalDate;

public record SleeveArchiveResponse(
        Integer sequenceNumber,
        Integer sleeveNumber,
        String design,
        String color,
        String manufacturer,
        Integer gear,
        Integer circumference,
        LocalDate manufactureDate,
        Integer width,
        SleeveType type,
        String deleteReason,
        LocalDate deletedAt,
        String deletedByName
) {
}
