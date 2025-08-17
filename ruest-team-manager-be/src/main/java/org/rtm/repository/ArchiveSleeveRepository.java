package org.rtm.repository;

import org.rtm.model.entity.SleeveArchive;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchiveSleeveRepository extends JpaRepository<SleeveArchive, Long> {

    Page<SleeveArchive> findAll(Pageable pageable);
}
