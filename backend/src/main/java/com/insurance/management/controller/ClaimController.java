package com.insurance.management.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.management.dto.ClaimDTO;
import com.insurance.management.model.ClaimEntity;
import com.insurance.management.service.ClaimService;

@RestController
@RequestMapping("/api/claim")
public class ClaimController {

	private static final Logger log = LoggerFactory.getLogger(ClaimController.class);

	@Autowired
	private ClaimService claimService;

	@PostMapping
	public ResponseEntity<String> submitClaim(@RequestBody ClaimDTO claimDTO) {
		log.info("Request submit claim for the claimDTO={}", claimDTO);

		ClaimEntity claimEntity = claimService.submitClaimFromDTO(claimDTO);

		log.info("Response submit claim for the claimDTO={} is successfull", claimEntity);
		return ResponseEntity.status(HttpStatus.CREATED).body("Claim submitted successfully");
	}

	@GetMapping("/{policyId}")
	public ResponseEntity<?> getClaimSummary(@PathVariable Integer policyId) {

		log.info("Request get claim for the id={}", policyId);
		List<ClaimDTO> summaries = claimService.getClaimsByClaimId(policyId);
		log.info("Response get claim for the id={} with details={}", policyId, summaries);

		return ResponseEntity.ok(summaries);

	}

	@PutMapping("/status")
	public ResponseEntity<?> updateClaimStatus(@RequestBody ClaimDTO dto) {

		log.info("Request cliam update for the id={}", dto.claimId());
		ClaimDTO updatedClaim = claimService.updateClaimStatus(dto);
		log.info("updated successfully for claimid={}", dto.claimId());
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedClaim.claimId());
		// return ResponseEntity..ok("Updated Successfully");

	}

	@GetMapping
	public ResponseEntity<?> getAllClaims() {

		log.info("Request for get all cliam");
		List<ClaimDTO> claims = claimService.getAllClaims();
		log.info("Response for get all cliam");
		return ResponseEntity.ok(claims);

	}

}