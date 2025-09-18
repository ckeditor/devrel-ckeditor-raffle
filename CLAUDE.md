# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a minimal repository containing a raffle/drawing system for CKEditor-related participants. The repository consists of:

- `names.txt` - A list of 107 names with corresponding numbers (1-107), formatted as comma-separated entries

## Architecture

The repository contains only data files with no executable code, build systems, or dependencies. This appears to be a simple data store for conducting raffles or drawings.

## Data Format

The names.txt file uses a consistent format:
- Each entry is numbered sequentially 
- Format: `number→Name,` (with trailing comma)
- Some names include extra whitespace that may need trimming for processing