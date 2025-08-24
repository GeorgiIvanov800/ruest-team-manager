package org.rtm.utils;

import lombok.AllArgsConstructor;
import org.rtm.repository.WarehouseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
@AllArgsConstructor
public class DummyDataSeeder implements CommandLineRunner {

    private final WarehouseRepository warehouseRepository;
    private final DataSource dataSource;
    @Override
    public void run(String... args) throws Exception {
    if (warehouseRepository.count() > 0) {
        return;
    }
        ResourceDatabasePopulator populator = new ResourceDatabasePopulator(
                new ClassPathResource("/db/dummy-data.sql")
        );

    populator.execute(dataSource);
    }
}
