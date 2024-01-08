import { render,screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
    it("buttonのタグがレンダリングされる", () => {
        render(<Button label="ボタン" onClick={() => alert("click")} />);

        const element = screen.getByRole("button");
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("ボタン");
    })
})