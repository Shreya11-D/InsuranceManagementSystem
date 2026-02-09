package com.insurance.management.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.management.dto.PaymentDTO;
import com.insurance.management.model.PaymentEntity;
import com.insurance.management.model.PaymentEntity.PaymentStatus;
import com.insurance.management.service.PaymentService;

@RestController
@RequestMapping("/payment")
public class PaymentController {

	private static final Logger log = LoggerFactory.getLogger(PaymentController.class);

	@Autowired
	private PaymentService paymentService;

	@PostMapping
	public ResponseEntity<String> makePayment(@RequestBody PaymentDTO dto) {
		log.info("Request make payment for the dto={}", dto);

		PaymentEntity paymentEntity = paymentService.makePayment(dto);

		log.info("Response make payment for the dto={} is successfull", dto);
		return ResponseEntity.status(HttpStatus.CREATED).body("Payment Successfull");
	}

	@GetMapping("/{paymentId}")
	public ResponseEntity<PaymentDTO> getPaymentDetails(@PathVariable int paymentId) {
		log.info("Request get payment for the id={}", paymentId);
		PaymentDTO responseDTO = paymentService.getPaymentDetails(paymentId);
		log.info("Response get payment for the id={} with details={}", paymentId, responseDTO);
		return ResponseEntity.ok(responseDTO);
	}

	@GetMapping
	public ResponseEntity<List<PaymentDTO>> getAllPayments() {
		log.info("Request for get all payment}");
		List<PaymentDTO> payments = paymentService.getAllPaymentDetails();
		log.info("Response for get all payment");
		return ResponseEntity.ok(payments);
	}

	@GetMapping("/bypolicyid/{policyId}")
	public ResponseEntity<List<PaymentDTO>> getPaymentsByPolicy(@PathVariable int policyId) {
		log.info("Request get payment for the id={}", policyId);
		List<PaymentDTO> paymentDTOs = paymentService.getPaymentsByPolicy(policyId);
		log.info("Response get payment for the id={} with details={}", policyId, paymentDTOs);
		return ResponseEntity.ok(paymentDTOs);
	}

//	@PutMapping("/{paymentId}/status")
//	public ResponseEntity<String> updatePaymentStatus(@PathVariable int paymentId,
//			@RequestBody Map<String, String> updates) {
//		log.info("Request payment update for the id={}", paymentId);
//		String statusString = updates.get("paymentStatus");
//		if (statusString == null) {
//			return ResponseEntity.badRequest().body("Missing 'paymentStatus' in request body.");
//		}
//
//		PaymentStatus newStatus = PaymentStatus.valueOf(statusString.toUpperCase());
//
//		// Assuming you have a service method to update the status
//		paymentService.updatePaymentStatus(paymentId, newStatus);
//		log.info("updated successfully for paymentId={}", paymentId);
//
//		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Updated successfully");
//	}
	@PutMapping("/{paymentId}")
	public ResponseEntity<String> updatePayment(@PathVariable int paymentId, @RequestBody PaymentDTO dto) {
	    log.info("Request to update payment with ID={}", paymentId);

	    try {
	        paymentService.updatePayment(paymentId, dto);
	        log.info("Payment updated successfully for ID={}", paymentId);
	        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Payment updated successfully");
	    } catch (Exception e) {
	        log.error("Error updating payment", e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update payment");
	    }
	}


}
