package com.insurance.management.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.management.model.PolicyEntity;
import com.insurance.management.service.PolicyService;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

	private static final Logger log = LoggerFactory.getLogger(PolicyController.class);

	@Autowired
	private PolicyService policyService;

	@PostMapping
	public ResponseEntity<String> createPolicy(@RequestBody PolicyEntity policyEntity) {
		log.info("Request create policy for the policyEntity={}", policyEntity);
		PolicyEntity createdPolicy = policyService.createPolicy(policyEntity);
		log.info("Response create policy for the policyEntity={} is successfull", policyEntity);
		return ResponseEntity.status(HttpStatus.CREATED).body("New policy created successfully");
	}

	@GetMapping
	public ResponseEntity<?> getAllPolicy() {
		log.info("Request for get all policy");
		List<PolicyEntity> policies = policyService.getAllPolicy();
		log.info("Response for get all policy");
		return ResponseEntity.ok(policies);
	}

	@GetMapping("/{policyId}")
	public ResponseEntity<?> getPolicyById(@PathVariable Integer policyId) {
		log.info("Request get policy for the id={}", policyId);
		PolicyEntity policy = policyService.getPolicyById(policyId);
		log.info("Response get policy for the id={} with details={}", policyId, policy);
		return ResponseEntity.ok(policy);
	}

	@PutMapping("/{policyId}")
	public ResponseEntity<?> updatePolicy(@PathVariable Integer policyId, @RequestBody PolicyEntity policyEntity) {
		log.info("Request policy update for the id", policyId);
		PolicyEntity updated = policyService.updatePolicy(policyId, policyEntity);
		log.info("updated successfully for claimid={}", policyId);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(updated.getPolicyId());
	}

	@DeleteMapping("/{policyId}")
	public ResponseEntity<String> deletePolicy(@PathVariable Integer policyId) {
		log.info("Request policy delete for the id={}", policyId);
		policyService.deletePolicy(policyId);
		log.info("Response policy delete for the id={}", policyId);
		return ResponseEntity.ok("Policy deleted successfully");
	}
}
