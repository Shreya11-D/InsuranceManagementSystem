package com.insurance.management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.insurance.management.dto.ClaimDTO;
import com.insurance.management.exception.ClaimIDNotFoundException;
import com.insurance.management.exception.ResourceNotFoundException;
import com.insurance.management.model.ClaimEntity;
import com.insurance.management.model.PolicyEntity;
import com.insurance.management.model.UserEntity;
import com.insurance.management.repository.ClaimRepository;
import com.insurance.management.repository.PolicyRepository;
import com.insurance.management.repository.UserRepository;

@Service
public class ClaimService {

	private static final Logger log = LoggerFactory.getLogger(ClaimService.class);

	private final ClaimRepository claimRepository;
	private final PolicyRepository policyRepository;
	private final UserRepository userRepository;

	public ClaimService(ClaimRepository claimRepository, PolicyRepository policyRepository,
			UserRepository userRepository) {
		this.claimRepository = claimRepository;
		this.policyRepository = policyRepository;
		this.userRepository = userRepository;
	}

	public ClaimEntity submitClaimFromDTO(ClaimDTO dto) {
		log.info("persist claim for the claimDTO={}", dto);
		PolicyEntity policy = policyRepository.findById(dto.policyId())
				.orElseThrow(() -> new ResourceNotFoundException("Policy not found with id: " + dto.policyId()));

		UserEntity adjuster = userRepository.findById(dto.adjusterId())
				.orElseThrow(() -> new ResourceNotFoundException("Adjuster not found with id: " + dto.adjusterId()));

		ClaimEntity claim = new ClaimEntity();
		claim.setClaimAmount(dto.claimAmount());
		claim.setClaimDate(dto.claimDate());
		claim.setClaimStatus(dto.claimStatus());
		claim.setPolicyEntity(policy);
		claim.setUserEntity(adjuster);

		ClaimEntity claimEntity = claimRepository.save(claim);
		log.info("persist claim for the claimDTO={} is success", claimEntity);
		return claimEntity;
	}

	public List<ClaimDTO> getClaimsByClaimId(Integer policyId) {
		List<ClaimEntity> claims = claimRepository.findByPolicyEntity_PolicyId(policyId); // Custom query method

		if (claims.isEmpty()) {
			log.error("Claim id is not found in db for claimid={}", policyId);
			throw new ClaimIDNotFoundException("claim not found with id: " + policyId);
		}

		List<ClaimDTO> summaries = claims.stream().map(claim -> {
			ClaimDTO dto = new ClaimDTO(claim.getClaimId(), claim.getClaimAmount(), claim.getClaimDate(),
					claim.getClaimStatus(), claim.getPolicyEntity().getPolicyId(), claim.getUserEntity().getUserId());
			return dto;
		}).collect(Collectors.toList());

		return summaries;
	}

	public ClaimDTO updateClaimStatus(ClaimDTO dto) {
		if (0 == dto.claimId() || null == dto.claimStatus()) {
			throw new IllegalArgumentException("Claim ID and status are required");
		}

		ClaimEntity existingClaim = claimRepository.findById(dto.claimId())
				.orElseThrow(() -> new ClaimIDNotFoundException("Claim not found with id: " + dto.claimId()));

		if (dto.adjusterId() != 0) {
			UserEntity adjuster = userRepository.findById(dto.adjusterId()).orElseThrow(
					() -> new ResourceNotFoundException("Adjuster not found with id: " + dto.adjusterId()));
			existingClaim.setUserEntity(adjuster);
		}

		existingClaim.setClaimStatus(dto.claimStatus());

		ClaimEntity updatedClaim = claimRepository.save(existingClaim);

		ClaimDTO responseDTO = new ClaimDTO(updatedClaim.getClaimId(), updatedClaim.getClaimAmount(),
				updatedClaim.getClaimDate(), updatedClaim.getClaimStatus(),
				updatedClaim.getPolicyEntity().getPolicyId(), updatedClaim.getUserEntity().getUserId());

		return responseDTO;
	}

	public List<ClaimDTO> getAllClaims() {
		List<ClaimEntity> claims = claimRepository.findAll();
		return claims.stream().map(claim -> {
			ClaimDTO dto = new ClaimDTO(claim.getClaimId(), claim.getClaimAmount(), claim.getClaimDate(),
					claim.getClaimStatus(), claim.getPolicyEntity().getPolicyId(), claim.getUserEntity().getUserId());

			return dto;
		}).collect(Collectors.toList());
	}

}