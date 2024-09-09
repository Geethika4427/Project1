package com.excelr.service;

import com.excelr.model.Erole;
import com.excelr.model.Role;
import com.excelr.model.User;
import com.excelr.repo.RoleRepo;
import com.excelr.repo.UserRepo;
import com.excelr.dto.UserDetailsDto;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;
    
    @Autowired
    private RoleRepo roleRepo;
    
   // @Autowired
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//    private PasswordEncoder passwordEncoder;
    
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    
    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }
    

    public User findByEmail(String email) {
        return userRepo.findByEmail(email); 
    }
    
   
    public User saveUser(User user) {
    	 // Hash the password before saving
    	user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Fetch existing roles from the database
        Set<Role> roles = user.getRoles().stream()
            .map(role -> {
                Role existingRole = roleRepo.findByName(role.getName());
                if (existingRole == null) {
                    throw new RuntimeException("Role not found: " + role.getName());
                }
                return existingRole;
            })
            .collect(Collectors.toSet());

        user.setRoles(roles);
        return userRepo.save(user);
    }

    public User registerUser(User user) {
        // Check if username already exists
        if (existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Check if email already exists
        if (findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Assign default role
        user.getRoles().add(getDefaultRole());

        // Save user
        return saveUser(user);
    }
    public boolean existsByUsername(String username) {
        return userRepo.existsByUsername(username);
    }

    public Role getDefaultRole() {
        Role role = roleRepo.findByName(Erole.ROLE_USER);
        if (role != null) {
            return role;
        } else {
            throw new RuntimeException("Role not found");
        }
    }

    public User getUserById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepo.findById(id).orElse(null);
        if (user != null) {
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail()); // Handle email field
            
            // Hash the updated password before saving
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            } 
            
            user.setPhoneNumber(userDetails.getPhoneNumber()); // Update phone number
            
            
            // Update roles
            Set<Role> roles = userDetails.getRoles().stream()
                .map(role -> {
                    Role existingRole = roleRepo.findByName(role.getName());
                    if (existingRole == null) {
                        throw new RuntimeException("Role not found: " + role.getName());
                    }
                    return existingRole;
                })
                .collect(Collectors.toSet());
            user.setRoles(roles);

            return userRepo.save(user);
        }
        return null;
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
    
    
    public UserDetailsDto getUserDetailsById(Long userId) {
        return userRepo.findUserDetailsById(userId);
    }
}
 
