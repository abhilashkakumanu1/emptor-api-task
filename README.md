### Problems faced

1. **CORS Error**: First tried to fix the error by sending the request through the "cors-anywhere" proxy. But, after a few trails I realised that the creator has limited the number of requests. So, I have created and deployed (on heroku) my own proxy server.
2. **Limiting the bio to 2 lines**: This one is quite tricky. Have spent considerable time coming up with a decent solution. Initially I thought of breaking the text after certain character count but realised that it won't if we are breaking "\n" in the middle. So, I have to go with the words approach.
3. **toggling the bio**: Implemented "id" property on the card element to make this work.
