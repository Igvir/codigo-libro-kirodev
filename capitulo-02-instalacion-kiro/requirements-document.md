# Requirements Document

## Introduction
Sistema de gestión de tareas personales con funcionalidades
CRUD básicas y filtrado por estado.

## Requirements

### Requirement 1: Create Tasks
**User Story:** As a user, I want to create new tasks with a
title and optional description, so that I can track my
pending work.

**Acceptance Criteria:**
1. WHEN a user enters a title and clicks "Add Task"
THE SYSTEM SHALL create a new task with pending status
2. WHEN a user leaves the title field empty
THE SYSTEM SHALL display a validation error
3. WHEN a user enters a title longer than 100 characters
THE SYSTEM SHALL display a warning but allow creation

### Requirement 2: Mark Tasks as Complete
**User Story:** As a user, I want to mark tasks as completed,
so that I can track my progress.

**Acceptance Criteria:**
1. WHEN a user clicks the checkbox of a pending task
THE SYSTEM SHALL mark it as completed
2. WHEN a user clicks the checkbox of a completed task
THE SYSTEM SHALL mark it as pending
3. WHEN a task status changes
THE SYSTEM SHALL persist the change to localStorage

### Requirement 3: Filter Tasks
**User Story:** As a user, I want to filter tasks by status,
so that I can focus on relevant items.

**Acceptance Criteria:**
1. WHEN a user selects "All" filter
THE SYSTEM SHALL display all tasks
2. WHEN a user selects "Pending" filter
THE SYSTEM SHALL display only pending tasks
3. WHEN a user selects "Completed" filter
THE SYSTEM SHALL display only completed tasks
