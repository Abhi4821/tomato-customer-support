package tomato;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import org.springframework.core.io.Resource;

@Service
public class ChatService {

    private final ChatClient chatClient;

    private final List<Message> history = new ArrayList<>();
    @Value("${tomato.system-prompt}")
    private Resource systemPromptResource;

    public ChatService(ChatClient.Builder builder) {

        this.chatClient = builder.build();
    }

    public String chat(String message) {
        history.add(new UserMessage(message));
        System.out.println("Start call api");

        String systemPrompt;
        try {
            systemPrompt = systemPromptResource
                    .getContentAsString(StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Failed to load system prompt", e);
        }
        String response = chatClient.prompt()
                .system(systemPrompt)
                .messages(history)
                .call()
                .content();
        history.add(new AssistantMessage(response));
        return response;
    }
    public void clearHistory() {
        history.clear();
    }
}

