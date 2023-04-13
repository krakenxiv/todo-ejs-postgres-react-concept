import Todo from '../models/todo';

export const timestampToDateConvert = (timestampToConvert: number): string => {
  const convertedDate = new Date(timestampToConvert);
  return convertedDate.toLocaleString();
};

export const arraySort = (
  arrayToSort: Todo[],
  sortBy: string,
  orderByAsc: boolean
) => {
  let sortedArray = [...arrayToSort];
  if (sortBy === 'description' || sortBy === 'name') {
    return sortByString(sortedArray, sortBy, orderByAsc);
  } else {
    return sortNumerically(sortedArray, sortBy, orderByAsc);
  }
};

const sortByString = (
  arrayToSort: Todo[],
  sortBy: string,
  orderByAsc: boolean
) => {
  let sortedArray = [...arrayToSort];
  sortedArray.sort((todo1, todo2) => {
    let valueCompare1 = todo1.todo_name.toLowerCase();
    let valueCompare2 = todo2.todo_name.toLowerCase();
    if (sortBy === 'description') {
      valueCompare1 = todo1.todo_description.toLowerCase();
      valueCompare2 = todo2.todo_description.toLowerCase();
    }
    if (valueCompare1 < valueCompare2) {
      return orderByAsc ? -1 : 1;
    }
    if (valueCompare1 > valueCompare2) {
      return orderByAsc ? 1 : -1;
    }
    return 0;
  });
  return sortedArray;
};

const sortNumerically = (
  arrayToSort: any[],
  sortBy: string,
  orderByAsc: boolean
) => {
  let sortedArray = [...arrayToSort];
  if (sortBy === 'id') {
    sortedArray.sort((todo1, todo2) => {
      return orderByAsc ? todo1.id - todo2.id : todo2.id - todo1.id;
    });
  } else if (sortBy === 'completed') {
    sortedArray.sort((todo1, todo2) => {
      return orderByAsc
        ? todo1.completed - todo2.completed
        : todo2.completed - todo1.completed;
    });
  }
  return sortedArray;
};
