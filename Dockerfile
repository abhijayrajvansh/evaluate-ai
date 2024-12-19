FROM node:18

# Install ESLint globally
RUN npm install -g eslint

# Create work directory
WORKDIR /app

# Set up ESLint configuration (optional)
RUN echo "{}" > .eslintrc.json

# Default command
CMD ["bash"]
