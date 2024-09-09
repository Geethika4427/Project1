package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.model.Address;

public interface AddressRepo extends JpaRepository<Address, Long> {

}
