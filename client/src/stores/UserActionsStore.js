/* eslint-disable max-len */
import { useState, useMemo } from 'react';

const requestDelete = async (_id) => {
  const res = await fetch(`/api/users/${_id}`, {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });

  return res.status === 200;
};

// eslint-disable-next-line camelcase
const requestAdd = async (newUser) => {
  const res = await fetch('/api/users',
    {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(newUser),
    });

  return [res.status === 200, await res.json()];
};

const requestUserUpdate = async (_id, params) => {
  const res = await fetch(`/api/users/${_id}`, {
    method: 'PUT',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(params),
  });

  return [res.status === 200, await res.json()];
};

export default () => {
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    role: -1,
    title: '',
    bio: '',
  });

  const updateNewUser = (...argus) => {
    const newFields = { ...newUser };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    setNewUser(newFields);
  };

  const deleteUser = async (userGroupName, _id) => {
    setLoading(true);
    const success = await requestDelete(_id);
    if (success) {
      let allUsers;
      if (userGroupName === '0') {
        allUsers = [...users];
        allUsers.splice(users.findIndex((r) => r._id === _id), 1);
        setUsers(allUsers);
      } else if (userGroupName === '1') {
        allUsers = [...users1];
        allUsers.splice(users1.findIndex((r) => r._id === _id), 1);
        setUsers1(allUsers);
      } else {
        allUsers = [...users2];
        allUsers.splice(users2.findIndex((r) => r._id === _id), 1);
        setUsers2(allUsers);
      }
    }
    updateNewUser(['name', ''], ['email', ''], ['phone_number', ''], ['password', ''], ['role', -1],
      ['title', ''], ['bio', '']);
    setLoading(false);
    return success;
  };

  const addUser = async () => {
    setLoading(true);
    const { title, bio, ...restOfUser } = newUser;
    const request = newUser.role > 0 ? newUser : restOfUser;
    const [success, res] = await requestAdd(request);
    if (success) {
      if (newUser.role === 0) {
        const allUsers = [...users];
        allUsers.push(res);
        setUsers(allUsers);
        updateNewUser(['name', ''], ['email', ''], ['phone_number', ''], ['password', ''],
          ['role', -1], ['title', ''], ['bio', '']);
      } else if (newUser.role === 1) {
        const allUsers = [...users1];
        allUsers.push(res);
        setUsers1(allUsers);
        updateNewUser(['name', ''], ['email', ''], ['phone_number', ''], ['password', ''],
          ['role', -1], ['title', ''], ['bio', '']);
      } else if (newUser.role === 2) {
        const allUsers = [...users2];
        allUsers.push(res);
        setUsers2(allUsers);
        updateNewUser(['name', ''], ['email', ''], ['phone_number', ''], ['password', ''],
          ['role', -1], ['title', ''], ['bio', '']);
      }
    } else {
      updateNewUser(['name', newUser.name], ['email', newUser.email], ['phone_number', newUser.phone_number],
        ['password', newUser.password], ['role', newUser.role], ['title', newUser.title], ['bio', newUser.bio]);
    }
    setLoading(false);
    return success;
  };

  const saveUser = async (id, original) => {
    setLoading(true);
    const user = users.find((u) => u._id === id)
      || users1.find((u) => u._id === id) || users2.find((u) => u._id === id);
    if (user.role !== original.role && user.role === 0) {
      user.title = '';
      user.bio = '';
      user.specialties = [];
    }
    const { password, ...restOfUser } = user;
    const [success] = await requestUserUpdate(id, restOfUser);
    // Rearrange lists
    console.log(user.role, original.role);
    console.log(user._id, original._id);
    if (success && user.role !== original.role) {
      switch (user.role) {
        case 0:
          users.push(user);
          // setUsers(users);
          break;
        case 1:
          users1.push(user);
          // setUsers1(users1);
          break;
        case 2:
          users2.push(user);
          // setUsers2(users2);
          break;
        default:
          break;
      }
      switch (original.role) {
        case 0:
          users.splice(users.findIndex((u) => u._id === user._id), 1);
          // setUsers(users);
          break;
        case 1:
          users1.splice(users1.findIndex((u) => u._id === user._id), 1);
          // setUsers1(users1);
          break;
        case 2:
          users2.splice(users2.findIndex((u) => u._id === user._id), 1);
          // setUsers2(users2);
          break;
        default:
          break;
      }
    }
    setLoading(false);
    return success;
  };

  const updateUsers = (userGroupName, index, ...argus) => {
    let allUsers;
    if (userGroupName === '0') {
      allUsers = [...users];
    } else if (userGroupName === '1') {
      allUsers = [...users1];
    } else {
      allUsers = [...users2];
    }
    const newFields = allUsers[index];
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    allUsers[index] = newFields;
    if (userGroupName === '0') {
      setUsers(allUsers);
    } else if (userGroupName === '1') {
      setUsers1(allUsers);
    } else {
      setUsers2(allUsers);
    }
  };

  useMemo(() => {
    console.log('render through store');
    const callUsers = async () => {
      const usersRequestFetch = async (type) => fetch(`/api/users/roles/${type}`)
        .then((response) => response.json())
        .then((data) => data);

      const servicesRequestFetch = async () => fetch('/api/services/types')
        .then((response) => response.json())
        .then((data) => data);

      setServices(await servicesRequestFetch());
      setUsers2(await usersRequestFetch('2'));
      setUsers1(await usersRequestFetch('1'));
      setUsers(await usersRequestFetch('0'));
      setLoading(false);
    };

    if (loading) {
      callUsers();
    }
  }, []);

  return [users, users1, users2, newUser, loading, updateUsers,
    updateNewUser, deleteUser, addUser, saveUser, services];
};
