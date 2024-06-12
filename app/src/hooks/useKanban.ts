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

  const setNewState = (board: string, task: Task[]) => {
    switch (board) {
    case 'To Do':
      setToDo(task);
      break;
    case 'Completed':
      setCompleted(task);
      break;
    case 'In Progress':
      setInProgress(task);
      break;
    case 'Trash':
      setTrash(task);
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
        return setNewState(fromBoard, newFromTasks);
      }
    }

    const newToTasks = getNewArrayFrom(toBoard);
    if (newFromTasks && newToTasks && task) {
      newFromTasks.splice(fromIndex, 1);
      newToTasks.splice(toIndex, 0,  { ...task, status: toBoard as Status });
      setNewState(fromBoard, newFromTasks);
      setNewState(toBoard, newToTasks);
    }
  }, [
    getNewArrayFrom,
    findItemById
  ]);
  
  const handleDragEnd = useCallback((result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
 
    moveItem(source.droppableId, destination.droppableId, source.index, destination.index, draggableId);
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