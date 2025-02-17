package com.email.writer;

import org.springframework.stereotype.Component;

@Component
public class EmailPromptBuilder {
    private static final String LINE_BREAK = "\n";
    private static final String DOUBLE_LINE_BREAK = "\n\n";

    public String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();

        // Base instructions
        prompt.append("Task: Generate a professional email reply")
                .append(LINE_BREAK)
                .append("Requirements:")
                .append(LINE_BREAK)
                .append("- Maintain professional email etiquette")
                .append(LINE_BREAK)
                .append("- Keep the response concise and focused")
                .append(LINE_BREAK)
                .append("- Do not generate a subject line")
                .append(LINE_BREAK);

        // Add tone instructions if specified
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("- Use a ").append(emailRequest.getTone()).append(" tone")
                    .append(LINE_BREAK);
        }

        // Add context if available
        if (emailRequest.getContext() != null && !emailRequest.getContext().isEmpty()) {
            prompt.append(DOUBLE_LINE_BREAK)
                    .append("Context:")
                    .append(LINE_BREAK)
                    .append(emailRequest.getContext());
        }

        // Add relationship context if available
        if (emailRequest.getRecipientRelationship() != null && !emailRequest.getRecipientRelationship().isEmpty()) {
            prompt.append(DOUBLE_LINE_BREAK)
                    .append("Recipient Relationship: ")
                    .append(emailRequest.getRecipientRelationship());
        }

        // Add original email
        prompt.append(DOUBLE_LINE_BREAK)
                .append("Original Email:")
                .append(LINE_BREAK)
                .append(emailRequest.getEmailContent());

        // Add specific formatting instructions
        prompt.append(DOUBLE_LINE_BREAK)
                .append("Format Instructions:")
                .append(LINE_BREAK)
                .append("- Start with an appropriate greeting")
                .append(LINE_BREAK)
                .append("- Use appropriate paragraphing")
                .append(LINE_BREAK)
                .append("- Include a professional signature line")
                .append(LINE_BREAK)
                .append("- Preserve any necessary quoted text from the original email");

        return prompt.toString();
    }
}