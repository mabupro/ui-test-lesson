// 途中まで自分

// import { render, screen } from "@testing-library/react"
// import userEvent from "@testing-library/user-event";
// import { UserSearch } from "./UserSearch"
// import axios from "axios"

// const user = userEvent.setup();

// describe("UserSearch", () => {
//     it("入力フィールドに値が空欄", () => {
//         render(<UserSearch />);
//         const input = screen.getByRole("input");
//         expect(input).toBeInTheDocument();
//         expect(input).toHaveTextContent("");
//     })

//     it("入力フィールドに値を入力されたテキストが調べられる", async () => {
//         render(<UserSearch />);
//         const input = screen.getByRole("input");
//         await user.type(input, "Test");
//         expect(screen.getByDisplayValue("Test")).toBeInTheDocument();
//     })

//     it("検索ボタンをクリックするとAPIリクエスト")
// })

// 解答例
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { UserSearch } from "./UserSearch";

const user = userEvent.setup();

jest.mock("axios");
const mockAxios = jest.mocked(axios);

describe("UserSearch", () => {
    beforeEach(() => {
        mockAxios.get.mockReset();
    })

    it("入力フォームに入力した内容でAPIリクエストが送信される", async () => {
        const userInfo = {
            id: 1,
            name: "Taro"
        };
        const resp = { data: userInfo };
        mockAxios.get.mockResolvedValue(resp);

        render(<UserSearch />);

        const input = screen.getByRole("textbox");
        await user.type(input, userInfo.name);
        const button = screen.getByRole("button");
        await user.click(button);

        expect(mockAxios.get).toHaveBeenCalledWith(
            `/api/users?query=${userInfo.name}`
        );
    })

    it("APIから取得したユーザー情報が画面に表示される", async () => {
        const userInfo = {
            id: 1,
            name: "Taro"
        };
        const resp = { data: userInfo };
        mockAxios.get.mockResolvedValue(resp);

        render(<UserSearch />);

        const input = screen.getByRole("textbox");
        await user.type(input, userInfo.name);
        const button = screen.getByRole("button");
        await user.click(button);

        await waitFor(() => expect(screen.getByText(userInfo.name)).toBeInTheDocument());
    })
})