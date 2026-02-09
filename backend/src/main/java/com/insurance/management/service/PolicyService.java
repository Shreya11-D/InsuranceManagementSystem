package com.insurance.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.management.exception.ResourceNotFoundException;
import com.insurance.management.model.PolicyEntity;
import com.insurance.management.repository.PolicyRepository;

@Service
public class PolicyService {

	@Autowired
	private PolicyRepository policyRepository;

	public PolicyEntity createPolicy(PolicyEntity policyEntity) {
		return policyRepository.save(policyEntity);
	}

	public PolicyEntity updatePolicy(Integer policyId, PolicyEntity updatePolicyEntity) {
		PolicyEntity policyEntity = policyRepository.findById(policyId).get();
		policyEntity.setPolicyNumber(updatePolicyEntity.getPolicyNumber());
		policyEntity.setVechicalDetails(updatePolicyEntity.getVehicleDetails());
		policyEntity.setCoverageAmount(updatePolicyEntity.getCoverageAmount());
		policyEntity.setCoverageType(updatePolicyEntity.getCoverageType());
		policyEntity.setPremiumAmount(updatePolicyEntity.getPremiumAmount());
		policyEntity.setStartDate(updatePolicyEntity.getStartDate());
		policyEntity.setEndDate(updatePolicyEntity.getEndDate());
		policyEntity.setPolicyStatus(updatePolicyEntity.getPolicyStatus());
		return policyRepository.save(policyEntity);
	}

	public PolicyEntity getPolicyById(Integer policyId) {
		return policyRepository.findById(policyId)
				.orElseThrow(() -> new ResourceNotFoundException("Policy not found with id:" + policyId));
	}

	public List<PolicyEntity> getAllPolicy() {
		return policyRepository.findAll();
	}

	public void deletePolicy(Integer policyId) {
		if (!policyRepository.existsById(policyId)) {
			throw new ResourceNotFoundException("Policy not found with id:" + policyId);
		}
		policyRepository.deleteById(policyId);
	}

}
