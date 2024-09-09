package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.model.Erole;
import com.excelr.model.Role;

public interface RoleRepo extends JpaRepository<Role, Long> {
	Role findByName(Erole name);
	//Role findByName(String name);
}
