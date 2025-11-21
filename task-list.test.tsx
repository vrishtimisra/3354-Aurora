import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "./task-list";

const sampleTasks = [
  { id: "1", title: "Write report", priority: "high", completed: false },
  { id: "2", title: "Study", priority: "medium", completed: false },
];

test("renders all tasks", () => {
  render(
    <TaskList
      tasks={sampleTasks}
      onToggle={() => {}}
      onDelete={() => {}}
      onPriorityChange={() => {}}
    />
  );

  expect(screen.getByText("Write report")).toBeInTheDocument();
  expect(screen.getByText("Study")).toBeInTheDocument();
});

test("calls onDelete when delete button is clicked", () => {
  const onDelete = jest.fn();

  render(
    <TaskList
      tasks={sampleTasks}
      onToggle={() => {}}
      onDelete={onDelete}
      onPriorityChange={() => {}}
    />
  );

  const deleteButtons = screen.getAllByRole("button");
  fireEvent.click(deleteButtons[1]); // delete second task

  expect(onDelete).toHaveBeenCalledTimes(1);
  expect(onDelete).toHaveBeenCalledWith("2");
});

test("calls onPriorityChange when dropdown changes", () => {
  const onPriorityChange = jest.fn();

  render(
    <TaskList
      tasks={sampleTasks}
      onToggle={() => {}}
      onDelete={() => {}}
      onPriorityChange={onPriorityChange}
    />
  );

  const dropdowns = screen.getAllByRole("combobox");
  fireEvent.change(dropdowns[0], { target: { value: "low" } });

  expect(onPriorityChange).toHaveBeenCalledTimes(1);
  expect(onPriorityChange).toHaveBeenCalledWith("1", "low");
});