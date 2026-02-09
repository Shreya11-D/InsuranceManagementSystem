package com.insurance.management.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.insurance.management.model.ClaimEntity.ClaimStatus;

public record ClaimDTO(int claimId,BigDecimal claimAmount,LocalDate claimDate,ClaimStatus claimStatus,int policyId,int adjusterId) {}
