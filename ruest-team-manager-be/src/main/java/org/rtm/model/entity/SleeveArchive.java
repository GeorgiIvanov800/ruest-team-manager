package org.rtm.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.rtm.model.enums.SleeveType;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "sleeves_archive")
public class SleeveArchive extends BaseEntity {

    @Column(nullable = false, updatable = false)
    private Long originalId;

    @Column(nullable = false)
    private Integer sequenceNumber;

    @Column(nullable = false)
    private Integer sleeveNumber;

    @Column(nullable = false)
    private String design;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private String manufacturer;

    private Integer gear;

    private Integer circumference;

    @Column(nullable = false)
    private LocalDate manufactureDate;

    @Column
    private Integer width;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SleeveType type;

    @Column(nullable = false)
    private String deleteReason;

    @Column(nullable = false)
    private LocalDate deletedAt;

    @Column(nullable = false)
    private String deletedByName;

    @Column(nullable = false)
    private String deletedById;


}
