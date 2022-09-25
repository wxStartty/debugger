#!/bin/sh

# 删除已经合并到 master 的分支
git branch --merged master | grep -v '^\*\|  master' | xargs -n 1 git branch -d
