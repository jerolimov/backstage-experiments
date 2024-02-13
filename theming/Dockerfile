FROM node:18
WORKDIR /app
COPY . /app/
RUN git config --global init.defaultBranch build && \
    git config --global user.email "you@example.com" && \
    git config --global user.name "Your Name" && \
    git init && \
    git add . && \
    git commit -m "Initial commit"
RUN yarn install
RUN yarn backstage-cli info
ENV PORT 3000
EXPOSE 3000
CMD [ "yarn", "dev" ]
