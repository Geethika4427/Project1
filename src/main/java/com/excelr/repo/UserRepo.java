//package com.excelr.repo;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import com.excelr.model.User;
//
//@Repository
//
//public interface UserRepo extends JpaRepository<User, Long> {
//	boolean existsByUsername(String username);
//	User findByUsername(String username);
//	User findByEmail(String email); 
//}


package com.excelr.repo;

import com.excelr.dto.UserDetailsDto;
import com.excelr.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    User findByUsername(String username);
    User findByEmail(String email);

    @Query("SELECT new com.excelr.dto.UserDetailsDto(u.username, u.email, a.street, a.locality, a.city, a.state, a.country, a.postalCode, u.phoneNumber) " +
           "FROM User u JOIN u.address a WHERE u.id = :userId")
    UserDetailsDto findUserDetailsById(@Param("userId") Long userId);
}
