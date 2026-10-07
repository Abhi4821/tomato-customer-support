package tomato;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody String message) {
        String response = chatService.chat(message);

        System.out.println("CONTROLLER RESPONSE = [" + response + "]");

        return response;
    }


    @DeleteMapping
    public void clearChat() {
        chatService.clearHistory();
    }
}