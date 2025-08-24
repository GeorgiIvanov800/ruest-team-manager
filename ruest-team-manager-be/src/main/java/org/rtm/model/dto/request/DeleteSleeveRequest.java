package org.rtm.model.dto.request;

import jakarta.validation.constraints.NotBlank;

public record DeleteSleeveRequest(
        @NotBlank
        String reason
) {
}
