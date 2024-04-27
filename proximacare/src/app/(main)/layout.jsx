import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css"; 
const MainLayout = ({children}) => {
    return ( 
    <CopilotKit url="/api/copilotkit/openai">    
      <CopilotSidebar
        labels={{
            title: "Your Assistant",
            initial: "Hi! 👋 How can I assist you today?",
          }}
      >
          {children}
        </CopilotSidebar>
      </CopilotKit>
     );
  }
   
  export default MainLayout;