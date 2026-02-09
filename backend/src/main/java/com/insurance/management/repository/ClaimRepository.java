package com.insurance.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.management.model.ClaimEntity;

@Repository 
//Connection spring boot with mysql database
public interface ClaimRepository extends JpaRepository<ClaimEntity,Integer> {
	List<ClaimEntity> findByPolicyEntity_PolicyId(Integer claimId);

}
