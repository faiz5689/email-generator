package com.email.writer;

import lombok.Data;

import java.util.List;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
    private String context;
    private String recipientRelationship;
    private String language;
    private boolean requiresFollowUp;
    private List<String> keyPointsToAddress;

    public EmailRequest(String emailContent, String tone, String context, String recipientRelationship, String language, boolean requiresFollowUp, List<String> keyPointsToAddress) {
        this.emailContent = emailContent;
        this.tone = tone;
        this.context = context;
        this.recipientRelationship = recipientRelationship;
        this.language = language;
        this.requiresFollowUp = requiresFollowUp;
        this.keyPointsToAddress = keyPointsToAddress;
    }

    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getRecipientRelationship() {
        return recipientRelationship;
    }

    public void setRecipientRelationship(String recipientRelationship) {
        this.recipientRelationship = recipientRelationship;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public boolean isRequiresFollowUp() {
        return requiresFollowUp;
    }

    public void setRequiresFollowUp(boolean requiresFollowUp) {
        this.requiresFollowUp = requiresFollowUp;
    }

    public List<String> getKeyPointsToAddress() {
        return keyPointsToAddress;
    }

    public void setKeyPointsToAddress(List<String> keyPointsToAddress) {
        this.keyPointsToAddress = keyPointsToAddress;
    }
}