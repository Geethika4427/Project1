package com.excelr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.Address;
import com.excelr.repo.AddressRepo;

@Service
public class AddressService {

    @Autowired
    private AddressRepo addressRepository;

    // Create or Update an Address
    public Address saveAddress(Address address) {
        return addressRepository.save(address);
    }

    // Retrieve all Addresses
    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    // Retrieve an Address by ID
    public Optional<Address> getAddressById(Long id) {
        return addressRepository.findById(id);
    }

    // Delete an Address by ID
    public void deleteAddressById(Long id) {
        addressRepository.deleteById(id);
    }
}
