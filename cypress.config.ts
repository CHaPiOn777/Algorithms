import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '1av744',
  e2e: {
    baseUrl: 'http://localhost:3000' 
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
