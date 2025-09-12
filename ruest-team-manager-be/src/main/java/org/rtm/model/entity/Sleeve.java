package org.rtm.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.rtm.model.enums.SleeveCondition;
import org.rtm.model.enums.SleeveType;

import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "sleeves")
public class Sleeve extends BaseEntity {

    @Column(nullable = false)
    private Integer printingSetNumber;

    @Column(nullable = false, unique = true)
    private Integer sleeveNumber;

    @Column(nullable = false)
    private String design;

    @Column(nullable = false)
    private String color; //Make this field ENUM when all the colors that are needed are present

    @Column(nullable = false)
    private String manufacturer;

    private String notes;

    private Integer gear; // Zahnrad

    private Integer circumference; //Umfang

    @Column(nullable = false)
    private Integer slot;

    @Column(nullable = false)
    private LocalDate manufactureDate;

    @Column
    private Integer width;

    private Long kmStand;

    @ManyToOne()
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SleeveType type;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SleeveCondition condition;
}
