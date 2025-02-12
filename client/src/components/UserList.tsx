import { WebUser_t, months } from "../types/user";
import Heading from "./Heading";

interface Props {
  users: WebUser_t[];
  onChange: (e: any) => void;
}

export default function UserList({ users, onChange }: Props) {
  const capitalise = (word: string) =>
    word[0].toUpperCase() + word.substring(1);

  if (users.length == 0) {
    return (
      <Heading variant="primary" position="center" title="NO USERS FOUND" />
    );
  }

  return (
    <>
      {users.map((user: WebUser_t, index: number) => (
        <div
          key={index}
          role="list"
          className="mb-1 box-border flex h-20 w-full items-center justify-between rounded-md bg-olivine-600 p-1 pl-4 pr-4 text-lg font-thin text-raisin_black"
        >
          <div className="flex items-center space-x-4">
            <input
              onChange={onChange}
              id={user.phoneNumber}
              value={user.phoneNumber}
              aria-label={user.phoneNumber}
              checked={user.isSelected}
              type="checkbox"
              className="size-5"
            />
            <div className="flex flex-col leading-tight">
              <div className="font-medium">{user.suburb.toUpperCase()}</div>
              <div className="">Age: {user.age}</div>
              <div className="">
                Birth month: {capitalise(months[user.dob.getMonth()])}
              </div>
            </div>
          </div>
          <div className="text-right">{user.visitCount} Visits</div>
        </div>
      ))}
    </>
  );
}
