package com.example.demo.repository;

import com.example.demo.entity.Item;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ItemRepositoryTest {
    @Autowired
    private ItemRepository repository;

    @Test
    void testSaveItem() {
        Item item = new Item();
        item.setName("Test Item");
        Item savedItem = repository.save(item);
        assertNotNull(savedItem.getId());
    }
}
