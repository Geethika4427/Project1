package com.excelr.service;

import com.excelr.model.Erole;
import com.excelr.model.Role;
import com.excelr.repo.RoleRepo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepo roleRepo;

//    public Role findByName(String name) {
//        return roleRepo.findByName(name);
//    }
    
    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }
    
    public Role findByName(String name) {
        // Convert the string to Erole
        Erole roleEnum;
        try {
            roleEnum = Erole.valueOf(name); // Convert string to Erole enum
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Role not found: " + name);
        }
        return roleRepo.findByName(roleEnum);
    }

    public Role saveRole(Role role) {
        return roleRepo.save(role);
    }

    public Role getRoleById(Long id) {
        return roleRepo.findById(id).orElse(null);
    }

    public Role updateRole(Long id, Role roleDetails) {
        Role role = roleRepo.findById(id).orElse(null);
        if (role != null) {
            role.setName(roleDetails.getName());
            return roleRepo.save(role);
        }
        return null;
    }

    public void deleteRole(Long id) {
        roleRepo.deleteById(id);
    }
}
