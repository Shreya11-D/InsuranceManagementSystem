package com.insurance.management.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.management.model.PaymentEntity;

@Repository 
//Connection spring boot with mysql database
public interface PaymentRepository extends JpaRepository<PaymentEntity,Integer> {
	
	List<PaymentEntity> findAllByPolicyEntityPolicyId(int policyId);



}
