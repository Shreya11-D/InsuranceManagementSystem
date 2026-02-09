package com.insurance.management.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "SupportTicket")
public class SupportTicketEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ticketId;

	@ManyToOne(optional = false)
	@JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
	private UserEntity userEntity;

	@Lob // For large text content
	@Column(columnDefinition = "TEXT")
	private String issueDescription;

	@Enumerated(EnumType.STRING)
	private TicketStatus ticketStatus;

	private LocalDate createdDate;

	private LocalDate resolvedDate;

	public enum TicketStatus {
		OPEN, RESOLVED
	}

	public SupportTicketEntity() {
	}

	public int getTicketId() {
		return ticketId;
	}

	public void setTicketId(int ticketId) {
		this.ticketId = ticketId;
	}

	public UserEntity getUserEntity() {
		return userEntity;
	}

	public void setUserEntity(UserEntity userEntity) {
		this.userEntity = userEntity;
	}

	public String getIssueDescription() {
		return issueDescription;
	}

	public void setIssueDescription(String issueDescription) {
		this.issueDescription = issueDescription;
	}

	public TicketStatus getTicketStatus() {
		return ticketStatus;
	}

	public void setTicketStatus(TicketStatus ticketStatus) {
		this.ticketStatus = ticketStatus;
	}

	public LocalDate getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}

	public LocalDate getResolvedDate() {
		return resolvedDate;
	}

	public void setResolvedDate(LocalDate resolvedDate) {
		this.resolvedDate = resolvedDate;
	}

}
