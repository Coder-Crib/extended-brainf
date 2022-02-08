# Extended Brainf--k
An fun attempt to make brainf--k _a bit_ more useful by extending its syntax.

## Terms
| Term       | Definition                       |
|:----------:|----------------------------------------|
| **Buffer** | Refers to an array                     |
| **Cell**   | Refers to a value/position in an array |

## Regular Syntax
| Token/Syntax | Definition                                                                                                 |
|:------------:|------------------------------------------------------------------------------------------------------------|
| **+**        | Add one to the current cell                                                                                |
| **-**        | Remove one from the current cell                                                                           |
| **<**        | Go to previous cell                                                                                        |
| **>**        | Go to next cell                                                                                            |
| **\[**       | If value of the current cell is not 0, execute what is inside the braces, else skip to after closing brace |
| **\]**       | Go to starting braces                                                                                      |
| **.**        | Output current cell value to console                                                                       |
| **,**        | Request input

## Modified Syntax
| Token/Syntax | Definition                                                                                                                                                |
|:------------:|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **.**        | Output current cell value _as a number_ to console.  _**Note: Doesn't output ASCII equivalent of cell value. Refer to extended syntax "$" for unicode.**_ |

### Comments
Currently, to create comments, you will need to use the | ... | syntax. This is to allow characters/numbers for future use as syntax.

## Extended Syntax
| Token/Syntax      | Definition                                                                                                                     |
|:-----------------:|--------------------------------------------------------------------------------------------------------------------------------|
| **$**             | Outputs the current cell value _as a unicode (ASCII-included) value_ to console.                                               |
| **{** ... **}**   | Creates a function out of the code written within the curly braces. _**Refer here for more info on [functions](#functions)**_  |
| **\'**            | Invokes the curly braces function                                                                                              |
| **(** ... **)**   | Creates a function out of the code written within the parenthesis. _**Refer here for more info on [functions](#functions)**_   |
| **\"**            | Invokes the parenthesis function                                                                                               |
| **\|** ... **\|** | Creates a comment. _**Note: Comments are removed during runtime**_                                                             |
| **&**             | Copies previous cell                                                                                                           |
| **;**             | Goes to next buffer                                                                                                            |
| **:**             | Goes to previous buffer                                                                                                        |
| **^**             | Uses the current cell value as the cell number/index.  _**Eg: If current cell value is 60, ^ will jump to Cell #60**_          |

### Functions
There are two available functions: **{**...**}** and **(**...**)**.
These two are seperate functions, but re-using the same function will overwrite the old one.

> **Example**  
> String — _{+++}{--} (>>>)(<<<)_
>
> In the above program, only two functions exist:
> - **{--}**
> - **(<<<)**
> 
> The other two declarations got overwritten.

Declarations **with the same braces** will overwrite one another.

To invoke the curly braces and parenthesis functions, use **\'** and **\"**, respectively.
