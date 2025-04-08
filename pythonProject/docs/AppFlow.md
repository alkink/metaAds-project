# App Flow Document - Meta Ads Targeting Assistant

This flow shows the step-by-step interaction between the user and the assistant:

1. **User**: Logs into the application (Login assumed) and accesses the "Meta Ads Targeting Assistant" section.

2. **System**: Displays a welcome message and "How can I help you?" question. Offers a "Get Started" button.

3. **User**: Clicks the "Get Started" button.

4. **System**: Asks "What industry are you operating in?" and lists clickable industry options.

5. **User**: Selects an industry from the list (e.g., Women's Hair Salon).

6. **System**: Confirms the selected industry (displayed as a user message) and asks "Approximately what age range of users would you like to target?" Provides a text input field.

7. **User**: Types the age range (e.g., 23-45) and submits.

8. **System**: Confirms the entered age range and asks "What type of targeting suggestion would you like to receive?" Provides "Single Targeting" and "Group Targeting" buttons.

9. **User**: Selects a targeting type (e.g., Group Targeting).

10. **System**: Confirms the selected type and asks "How many [based on selected type 'interests' or 'groups'] suggestions would you like to receive? (Please enter only a number)". Provides a number input field.

11. **User**: Enters a number (e.g., 2) and submits.

12. **System**: Confirms the entered number. Shows a "Loading..." or similar indicator while sending the request to the AI engine.

13. **AI Engine**: Processes the inputs (industry, age, type, number) and generates appropriate interests/groups.

14. **System**: Receives and formats results from AI. Lists the results under the heading "Targeting Suggestions for Your Meta Ads" (Age Range and Interests). Adds a brief AI-generated explanation below the results. Displays "Suggest More" and "Start Over" buttons.

15. **Next Steps (Depending on User Choice)**:
   - If user selects "Suggest More": System requests new/different suggestions from AI with the same criteria (can return to Step 12 or add to existing results).
   - If user selects "Start Over": System clears the chat and returns to Step 4.
   - If user takes no action: Results remain on screen. 