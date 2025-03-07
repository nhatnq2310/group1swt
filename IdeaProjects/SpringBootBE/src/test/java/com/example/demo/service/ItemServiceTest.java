package com.example.demo.service;

import com.example.demo.entity.Item;
import com.example.demo.repository.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private ItemService itemService;

    private Item item;

    @BeforeEach
    void setUp() {
        item = new Item(1L, "Dumbbell");
    }

    @Test
    void testGetAllItems() {
        when(itemRepository.findAll()).thenReturn(Arrays.asList(item));
        List<Item> items = itemService.getAllItems();
        assertFalse(items.isEmpty());
        assertEquals(1, items.size());
        verify(itemRepository, times(1)).findAll();
    }

    @Test
    void testGetItemById() {
        when(itemRepository.findById(anyLong())).thenReturn(Optional.of(item));
        Optional<Item> foundItem = itemService.getItemById(1L);
        assertTrue(foundItem.isPresent());
        assertEquals("Dumbbell", foundItem.get().getName());
        verify(itemRepository, times(1)).findById(anyLong());
    }

    @Test
    void testCreateItem() {
        when(itemRepository.save(any(Item.class))).thenReturn(item);
        Item savedItem = itemService.createItem(new Item(null, "Barbell"));
        assertNotNull(savedItem);
        assertEquals("Dumbbell", savedItem.getName());
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Test
    void testUpdateItem() {
        when(itemRepository.findById(anyLong())).thenReturn(Optional.of(item));
        when(itemRepository.save(any(Item.class))).thenReturn(item);

        Item updatedItem = itemService.updateItem(1L, new Item(null, "Updated Dumbbell"));
        assertNotNull(updatedItem);
        assertEquals("Updated Dumbbell", updatedItem.getName());
        verify(itemRepository, times(1)).findById(anyLong());
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Test
    void testDeleteItem() {
        doNothing().when(itemRepository).deleteById(anyLong());
        itemService.deleteItem(1L);
        verify(itemRepository, times(1)).deleteById(anyLong());
    }
}
