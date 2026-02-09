package com.insurance.management.dto;

import java.time.LocalDate;

import com.insurance.management.model.SupportTicketEntity.TicketStatus;

public record SupportTicketDTO(int ticketId,int userId, String issueDescription, TicketStatus ticketStatus, LocalDate createdDate,
		LocalDate resolvedDate) {}