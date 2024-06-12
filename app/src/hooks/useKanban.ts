import { useCallback, useState } from 'react';
import type { Status, Task } from '../types/app.type';

interface DefaultTask {
  todoArg: Task[]
  inProgressArg: Task[]
  completedArg: Task[]
  trashArg: Task[]
}

export const useKanban = ({ todoArg, inProgressArg, completedArg, trashArg }: DefaultTask) => {
  const [todo, setToDo] = useState<Task[]>(todoArg);
  const [inProgress, setInProgress] = useState<Task[]>(inProgressArg);
  const [completed, setCompleted] = useState<Task[]>(completedArg);
  const [trash, setTrash] = useState<Task[]>(trashArg);

  const findItemById = useCallback((id: string, array: Task[]) => {
    return array.find((item: Task) => `${item.id }` === id);
  }, []);

  const setNewState = (board: string, tasks: Task[]) => {
    switch (board) {
    case 'To Do':
      setToDo(tasks);
      break;
    case 'Completed':
      setCompleted(tasks);
      break;
    case 'In Progress':
      setInProgress(tasks);
      break;
    case 'Trash':
      setTrash(tasks);
      break;
    }
  };

  const getNewArrayFrom = useCallback((id: string) => {
    switch (id) {
    case 'To Do':
      return [...todo];
    case 'Completed':
      return [...completed];
    case 'In Progress':
      return [...inProgress];
    case 'Trash':
      return [...trash];
    }
  }, [
    todo,
    inProgress,
    completed,
    trash,
  ]);

  const moveItem = useCallback((fromBoard: string, toBoard: string, fromIndex: number, toIndex: number, itemId: string, newTask?: Task) => {
    const newFromTasks = getNewArrayFrom(fromBoard);
    const task = newTask ?? findItemById(itemId, newFromTasks ?? []);
    if (fromBoard === toBoard) {
      if (newFromTasks && task) {
        newFromTasks.splice(fromIndex, 1);
        newFromTasks.splice(toIndex, 0, { ...task, status: toBoard as Status });
        const fromTasksState = newFromTasks.map((item, index) => ({ ...item, sequence: index + 1 }));
        setNewState(fromBoard, fromTasksState);
        return fromTasksState;
      }
    }

    const newToTasks = getNewArrayFrom(toBoard);
    if (newFromTasks && newToTasks && task) {
      newFromTasks.splice(fromIndex, 1);
      newToTasks.splice(toIndex, 0,  { ...task, status: toBoard as Status });
      const fromTasksState = newFromTasks.map((item, index) => ({ ...item, sequence: index }));
      const toTasksState = newToTasks.map((item, index) => ({ ...item, sequence: index }));
      setNewState(fromBoard, fromTasksState);
      setNewState(toBoard, toTasksState);
      return [...newToTasks, ...newFromTasks];
    }
  }, [
    getNewArrayFrom,
    findItemById
  ]);

  const handleDragEnd = useCallback((result: any, afterMovedFn?: (tasks?: Task[]) => void) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
 
    const updatedTasks = moveItem(source.droppableId, destination.droppableId, source.index, destination.index, draggableId);
    afterMovedFn?.(updatedTasks);
  }, [moveItem]);

  return {
    getNewArrayFrom,
    setNewState,
    moveItem,
    handleDragEnd,
    todo,
    inProgress,
    completed,
    trash,
  };
};