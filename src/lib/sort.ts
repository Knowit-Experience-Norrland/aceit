export function sortUsers(users: App.InputValue[], adminId: string) {
    return [
      ...users.filter(user => user.id === adminId),
      ...users
        .filter(user => user.id !== adminId)
        .sort((a, b) => {
          const nameA = a.label.toLowerCase();
          const nameB = b.label.toLowerCase();
          return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
        })
    ];
  }