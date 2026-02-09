package com.insurance.management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.management.dto.PaymentDTO;
import com.insurance.management.exception.ResourceNotFoundException;
import com.insurance.management.model.PaymentEntity;
import com.insurance.management.model.PolicyEntity;
import com.insurance.management.model.PaymentEntity.PaymentStatus;
import com.insurance.management.repository.PaymentRepository;
import com.insurance.management.repository.PolicyRepository;

@Service
public class PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;
	private PolicyRepository policyRepository;

	public PaymentService(PaymentRepository paymentRepository, PolicyRepository policyRepository) {
		super();
		this.paymentRepository = paymentRepository;
		this.policyRepository = policyRepository;
	}

	public PaymentEntity makePayment(PaymentDTO dto) {
		PolicyEntity policy = policyRepository.findById(dto.policyId())
				.orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID: " + dto.policyId()));

		PaymentEntity payment = new PaymentEntity();
		payment.setPaymentAmount(dto.paymentAmount());
		payment.setPaymentDate(dto.paymentDate());
		// Convert string to enum
		payment.setPaymentStatus(dto.paymentStatus());
		payment.setPolicyEntity(policy);

		return paymentRepository.save(payment);
	}

	public PaymentDTO getPaymentDetails(int paymentId) {
		PaymentEntity payment = paymentRepository.findById(paymentId)
				.orElseThrow(() -> new ResourceNotFoundException("Payment not found with ID: " + paymentId));

		PaymentDTO dto = new PaymentDTO(payment.getPaymentId(), payment.getPolicyEntity().getPolicyId(),
				payment.getPaymentAmount(), payment.getPaymentStatus(), payment.getPaymentDate());
		return dto;
	}

	public List<PaymentDTO> getAllPaymentDetails() {
		List<PaymentEntity> payments = paymentRepository.findAll();

		List<PaymentDTO> paymentDTOs = payments.stream()
				.map(payment -> new PaymentDTO(payment.getPaymentId(), payment.getPolicyEntity().getPolicyId(),
						payment.getPaymentAmount(), payment.getPaymentStatus(), payment.getPaymentDate()))
				.collect(Collectors.toList());

		return paymentDTOs;
	}

	public List<PaymentDTO> getPaymentsByPolicy(int policyId) {
		if (!policyRepository.existsById(policyId)) {
			throw new ResourceNotFoundException("Policy not found with ID: " + policyId);
		}

		List<PaymentEntity> payments = paymentRepository.findAllByPolicyEntityPolicyId(policyId);

		return payments.stream()
				.map(payment -> new PaymentDTO(payment.getPaymentId(), payment.getPolicyEntity().getPolicyId(),
						payment.getPaymentAmount(), payment.getPaymentStatus(), payment.getPaymentDate()))
				.collect(Collectors.toList());
	}

//	public String updatePaymentStatus(int paymentId, PaymentStatus newStatus) {
//		PaymentEntity existingPayment = paymentRepository.findById(paymentId)
//				.orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + paymentId));
//
//		existingPayment.setPaymentStatus(newStatus);
////		PaymentEntity updatedPayment = paymentRepository.save(existingPayment);
//		paymentRepository.save(existingPayment);
//
//		// Conversion to DTO done here
//		return "Updated successfully";
//	}
	
	public void updatePayment(int paymentId, PaymentDTO dto) {
	    PaymentEntity existing = paymentRepository.findById(paymentId)
	        .orElseThrow(() -> new RuntimeException("Payment not found"));

	    existing.setPaymentAmount(dto.paymentAmount());
	    existing.setPaymentDate(dto.paymentDate());
	    existing.setPaymentStatus(dto.paymentStatus());
	    existing.getPolicyEntity().setPolicyId(dto.policyId());

	    paymentRepository.save(existing);
	}


}
