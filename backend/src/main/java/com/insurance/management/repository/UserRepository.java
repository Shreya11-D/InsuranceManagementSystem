package com.insurance.management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.management.model.UserEntity;

@Repository 
//Connection spring boot with mysql database
public interface UserRepository extends JpaRepository<UserEntity,Integer>{

	Optional<UserEntity> findByUserName(String userName);

}