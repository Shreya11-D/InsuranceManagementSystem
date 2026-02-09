package com.insurance.management.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.insurance.management.model.PaymentEntity.PaymentStatus;

public record PaymentDTO(int paymentId, int policyId, BigDecimal paymentAmount, PaymentStatus paymentStatus,
			LocalDate paymentDate) {}