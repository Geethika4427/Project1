package com.excelr.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Role {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Erole name;
    
//    @ManyToMany(mappedBy = "roles")
//    @JsonBackReference("user-roles")
//    private Set<User> users = new HashSet<>();
        
//    @ManyToMany(mappedBy = "roles")
//    @JsonIgnore 
//    private Set<User> users = new HashSet<>();
//    
 
   
    @ManyToMany(mappedBy = "roles")
 //   @JsonBackReference(value = "user-roles")
    @JsonIgnore
    private Set<User> users = new HashSet<>();
}
